export const dynamic = "force-dynamic";

async function getData() {
    const res = await fetch("http://localhost:3000/api/rsvp", { cache: "no-store" });
    return res.json();
}

export default async function Admin() {
    const data = await getData();

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-2xl font-semibold">RSVP Admin</h1>
            <p className="mt-2 text-white/70">Local store: rsvp-store.json</p>

            <div className="mt-6 overflow-auto rounded-xl border border-white/10">
                <table className="min-w-[700px] w-full text-sm">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Attending</th>
                            <th className="p-3 text-left">Guests</th>
                            <th className="p-3 text-left">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items?.map((x: any, i: number) => (
                            <tr key={i} className="border-t border-white/10">
                                <td className="p-3">{x.name}</td>
                                <td className="p-3">{x.attending}</td>
                                <td className="p-3">{x.guests}</td>
                                <td className="p-3 text-white/70">{x.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}