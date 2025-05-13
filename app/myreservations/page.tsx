import Image from "next/image";

const MyReservationPage =() =>{
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My Reservations</h1>
            <div className="space-y-4">
                <div className="p-5 grid grid-col-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image 
                            fill 
                            src="/beach_1.jpg"
                            alt="Beach House"
                            className="hover:scale-110 object-cover transition w-full h-full"/>
                        </div>
                    </div>

                      <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl"> Property Name</h2>

                        <p className="mb-2"><strong>Check in data:</strong> 14/02/2025</p>
                        <p className="mb-2"><strong>Check out data:</strong> 16/02/2025</p>

                        <p className="mb-2"><strong>Number of nights:</strong> 2</p>
                        <p className="mb-2"><strong>Total price:</strong> $200</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb hover:bg text-white rounded-xl">Go To Property</div>

                    </div>
                </div>

              <div className="p-5 grid grid-col-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image 
                            fill 
                            src="/beach_1.jpg"
                            alt="Beach House"
                            className="hover:scale-110 object-cover transition w-full h-full"/>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl"> Property Name</h2>

                        <p className="mb-2"><strong>Check in data:</strong> 14/02/2025</p>
                        <p className="mb-2"><strong>Check out data:</strong> 16/02/2025</p>

                        <p className="mb-2"><strong>Number of nights:</strong> 2</p>
                        <p className="mb-2"><strong>Total price:</strong> $200</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb hover:bg text-white rounded-xl">Go To Property</div>

                    </div>
                </div>
            </div>
        </main>
    )
}
export default MyReservationPage;