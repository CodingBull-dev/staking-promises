export default function ErrorMessage({ error }: { error: string }) {
    return (<div className="text-white">
        <h2 className="font-bold text-2xl">Error</h2>
        <p>{error}</p>
        <p className="mt-4">Make sure you have <a className="underline text-blue-400" href="https://metamask.io/">Metamask installed</a>!</p>
    </div>);
}
