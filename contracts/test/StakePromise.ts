import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Stake Promise", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Promise = await ethers.getContractFactory("StakePromise");
    const stakePromise = await Promise.deploy(unlockTime, "This is a test", { value: lockedAmount });

    return { stakePromise, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right deadline", async function () {
      const { stakePromise, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await stakePromise.deadline()).to.equal(unlockTime);
    });

    it("Should set the right author", async function () {
      const { stakePromise, owner } = await loadFixture(deployOneYearLockFixture);

      expect((await stakePromise.author()).account).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { stakePromise, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(stakePromise.getAddress())).to.equal(
        lockedAmount
      );
    });
  });

  describe("Cancelation", function () {
    it("Should cancel the transaction and return the tokens", async function () {
      const { stakePromise, owner, lockedAmount } = await loadFixture(deployOneYearLockFixture);

      await expect(stakePromise.cancel()).to.changeEtherBalances(
        [owner],
        [lockedAmount]
      );
    });

    it("Should fail to cancel the transaction if the second user signed the promise", async function () {
      const { stakePromise, lockedAmount, otherAccount } = await loadFixture(deployOneYearLockFixture);

      // @ts-ignore sign is valid. For some reason it is not detecting it
      await stakePromise.connect(otherAccount).sign({ value: lockedAmount });

      await expect(stakePromise.cancel()).to.be.revertedWith(
        "The promise can not be cancelled once it becomes active"
      );
    });

    it("Should not allow a second account to cancel the promise", async function () {
      const { stakePromise, otherAccount } = await loadFixture(deployOneYearLockFixture);

      // @ts-ignore sign is valid. For some reason it is not detecting it
      await expect(stakePromise.connect(otherAccount).cancel()).to.be.revertedWith(
        "Only the author can cancel the contract"
      );
    });
  });

  describe("Approvals", function () {
    it("Should fail if the amount doesn't match the stake", async function () {
      const { stakePromise } = await loadFixture(deployOneYearLockFixture);

      await expect(stakePromise.sign()).to.be.revertedWith(
        "User didn't send enough tokens as the owner"
      );
    });

    it("Should fail if the author wants to approve it", async function () {
      const { stakePromise, lockedAmount } = await loadFixture(deployOneYearLockFixture);

      await expect(stakePromise.sign({ value: lockedAmount })).to.be.revertedWith(
        "Author can not sign the contract themselves"
      );
    });

    it("Should become active if the second account signed the contract", async function () {
      const { stakePromise, lockedAmount, otherAccount } = await loadFixture(deployOneYearLockFixture);

      // @ts-ignore sign is valid. For some reason it is not detecting it
      await stakePromise.connect(otherAccount).sign({ value: lockedAmount });
      expect(await stakePromise.active()).to.equals(true);
      expect(await stakePromise.totalStakedAmount()).to.equals(lockedAmount * 2);
    });
  });

  describe("Deadline", function () {
    it("Should fail if the deadline hasn't happened yet", async function () {
      const { stakePromise } = await loadFixture(
        deployOneYearLockFixture
      );
      expect(stakePromise.onDeadline).to.be.revertedWith(
        "The deadline has not happened yet"
      );
    });

    it("Should transfer the funds to the promise owners", async function () {
      const { stakePromise, unlockTime, lockedAmount, owner, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );

      // @ts-ignore sign is valid. For some reason it is not detecting it
      await stakePromise.connect(otherAccount).sign({ value: lockedAmount });

      // @ts-ignore sign is valid. For some reason it is not detecting it
      await stakePromise.connect(otherAccount).approve();
      await stakePromise.approve();

      await time.increaseTo(unlockTime);

      // expect(await stakePromise.onDeadline()).to.equals(8);

      await expect(stakePromise.onDeadline()).to.changeEtherBalances(
        [owner, otherAccount],
        [lockedAmount, lockedAmount]
      );
    });

    it("Should fail if the second user didn't sign the contract", async function () {
      const { stakePromise, unlockTime } = await loadFixture(
        deployOneYearLockFixture
      );

      await time.increaseTo(unlockTime);

      expect(stakePromise.onDeadline()).to.be.revertedWith(
        "The promise is not active"
      );
    });

    it("Should flush the funds if the promise was not fulfilled", async function () {
      const { stakePromise, unlockTime, lockedAmount, owner, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );

      // @ts-ignore sign is valid. For some reason it is not detecting it
      await stakePromise.connect(otherAccount).sign({ value: lockedAmount });

      await time.increaseTo(unlockTime);

      await expect(stakePromise.onDeadline()).to.changeEtherBalances(
        [owner, otherAccount],
        [0, 0]
      );

      expect(await ethers.provider.getBalance(stakePromise.getAddress())).to.equal(0);
      expect(await stakePromise.active()).to.equals(false);
      expect(await stakePromise.totalStakedAmount()).to.equals(0);
    });
  });
});
