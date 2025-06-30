import PropertyList from "../properties/PropertyList";
import { getUserId } from "@/app/lib/actions";

const MyFavoritesPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p className="text-2xl font-bold">Please log in to view your favorites</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 py-12">
            <h1 className="my-6 text-2xl">My Favorites</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PropertyList 
                    favorites={true} 
                />
            </div>
        </main>
    );

    
}
export default MyFavoritesPage;