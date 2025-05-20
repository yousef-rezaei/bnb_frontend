import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import Image from "next/image";
const PropertyDetailPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          src="/beach_1.jpg"
          className="object-cover w-full h-full"
          alt="Beach House"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">PropertyName</h1>
          <span className="mb-6 block text-lg text-gray-600">
            4 guests - 2 rooms - 1 bathroom
          </span>
          <hr />
          <div className="py-5 flex items-center space-x-4">
            <Image
              src="/profile_pic_1.jpg"
              className="rounded-full"
              alt="the user name"
              width={50}
              height={50}
            />
            <p>
              <strong>Joun Dou</strong> is your host
            </p>
          </div>
          <hr />
          <p className="mt-6 text-lg">
            adasda sdf sdf sdf sdfs df sdf sd fsd f sdfsdf sdf sdf sd f sdfs df
            sdf sd f sdf sdf sdf sd fs df sdf sd fs df sdf
          </p>
        </div>
        <ReservationSidebar />
      </div>
    </main>
  );
};
export default PropertyDetailPage;
