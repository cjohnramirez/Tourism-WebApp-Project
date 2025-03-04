import { useNavigate, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar/NavBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MapPin, Package, Calendar as CalendarIcon, Plus, Minus, Box } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
<<<<<<< HEAD
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
=======
} from "@/components/ui/carousel";
import { useGlobalStore } from "@/components/Contexts/GlobalContext";
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2

function PackagePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const packageData = useGlobalStore((state) => state.packageData);
  const getPackageData = useGlobalStore((state) => state.getPackageData);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [indexPackage, setIndexPackage] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getPackageData(Number(id));
  }, []);

<<<<<<< HEAD
  const getUserData = async () => {
    try {
      const fetchPkg = await api.get(`apps/package/${id}/`);
      setTourPkg(fetchPkg.data);
    } catch (error) {
      const err = error as AxiosError;
      let errorMessage = "An unexpected error occurred.";

      if (err.response) {
        errorMessage = `Error ${err.response.status}: ${err.response.data || "Something went wrong"}`;
      } else if (err.request) {
        errorMessage =
          "Network error: Unable to reach the server. Please check your internet connection.";
      } else {
        errorMessage = err.message;
      }

      toast({
        title: "404 NOT FOUND",
        description: errorMessage,
      });
    }
  };

  const parsedTourPackage: tourPackage[] = tourPkg;

=======
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
  return (
    <div id="main">
      <div className="fixed bottom-0 z-20 flex w-full justify-center px-8 py-4">
        <div className="hidden w-full max-w-[500px] justify-center rounded-full border-[1px] bg-[#ffffff] p-4 dark:bg-[#09090b] lg:flex">
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              onClick={() =>
                document.getElementById("main")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Overview
            </Button>
            <Button
              variant={"outline"}
              onClick={() =>
                document
                  .getElementById("description")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            >
              Description
            </Button>
            <Button
              variant={"outline"}
              onClick={() =>
                document.getElementById("packageType")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Package Type
            </Button>
            <Button
              variant={"outline"}
              onClick={() =>
                document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Reviews
            </Button>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 bg-[#ffffff] px-8 py-4 dark:bg-[#09090b]">
        <NavBar isNavBar={true} />
      </div>
      <div className="flex flex-col items-center gap-4 p-8 lg:mx-8 lg:my-4" id="description">
        <div className="w-full max-w-[1200px] items-center justify-between lg:flex">
          <div className="mb-4 flex flex-col gap-[5px] lg:mb-0">
<<<<<<< HEAD
            <p className="text-2xl font-semibold">{parsedTourPackage[0]?.name}</p>
=======
            <p className="text-2xl font-semibold">{packageData && packageData[0]?.name}</p>
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
            <div className="flex gap-4">
              <MapPin />
              <p>{packageData && packageData[0]?.address}</p>
            </div>
          </div>
          <Button variant={"outline"}>Save to Wishlist</Button>
        </div>
<<<<<<< HEAD
        <div className="w-screen px-28">
          <Carousel opts={{ align: "start" }} >
            <CarouselContent>
              {parsedTourPackage[0]?.package_image.map((image, index) => (
=======
        <div className="w-screen max-w-[1200px] xl:p-0 lg:px-16 px-8">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {packageData && packageData[0]?.package_image.map((image, index) => (
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div>
                    <img
                      src={image.image}
<<<<<<< HEAD
                      alt={`${parsedTourPackage[0]?.name} image ${index}`}
=======
                      alt={`${packageData[0]?.name} image ${index}`}
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
                      className="h-96 w-full rounded-xl object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
<<<<<<< HEAD
            <CarouselPrevious />
            <CarouselNext />
=======
            {/* <CarouselPrevious />
            <CarouselNext /> */}
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
          </Carousel>
        </div>
        <div className="w-full gap-4 lg:flex lg:max-w-[1200px]">
          <div className="flex flex-col gap-4 lg:w-2/3">
            <div className="rounded-2xl border-[1px] p-8">
              <p className="text-xl font-semibold">Description</p>
              <p>{packageData && packageData[0]?.description}</p>
            </div>
            <div className="flex flex-col gap-8 rounded-2xl border-[1px] p-8" id="packageType">
              <div className="flex flex-col gap-4 lg:rounded-2xl lg:border-[1px] lg:p-8">
                <div>
                  <p className="text-xl font-semibold">Package Type</p>
                  <div className="pt-4 lg:flex lg:gap-4">
<<<<<<< HEAD
                    {parsedTourPackage[0]?.package_type.map((packageType, index) => {
=======
                    {packageData && packageData[0]?.package_type.map((packageType, index) => {
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
                      return (
                        <Button
                          className={`mb-4 flex rounded-2xl border-[1px] lg:mb-0 ${indexPackage == index ? "bg-teal-500 text-black" : ""}`}
                          variant={"outline"}
                          key={index}
                          onClick={() => {
                            setIndexPackage(index);
                          }}
                        >
                          <Package />
                          <p>{packageType.name}</p>
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div>
                  <p className="text-xl font-semibold">Package Amenities</p>
                  <p>These are amenities that are available for all packages</p>
                  <div className="grid gap-2 pt-4 lg:grid-cols-2">
<<<<<<< HEAD
                    {parsedTourPackage[0]?.package_amenity.map((amenity, index) => {
=======
                    {packageData && packageData[0]?.package_amenity.map((amenity, index) => {
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
                      return (
                        <div key={index} className="flex gap-4 rounded-full border-[1px] p-2 px-4">
                          <Box />
                          <p>{amenity.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div>
                  <p className="text-xl font-semibold">Package Type Amenities</p>
                  <p>These are amenities that are available for the selected package</p>
                  <div className="grid gap-2 pt-4 lg:grid-cols-2">
<<<<<<< HEAD
                    {parsedTourPackage[0]?.package_type[indexPackage].package_type_amenity.map(
=======
                    {packageData && packageData[0]?.package_type[indexPackage].package_type_amenity.map(
>>>>>>> d590c20627205c050573c67dd926bf1f5e95d9f2
                      (amenity, index) => {
                        return (
                          <div
                            key={index}
                            className="flex gap-4 rounded-full border-[1px] p-2 px-4"
                          >
                            <Box />
                            <p>{amenity.name}</p>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="items-center gap-4 lg:flex">
                  <div className="items-center gap-4 lg:flex lg:w-2/3">
                    <p className="text-xl font-semibold">Select Tour Date</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="p-6">
                          <p>{date?.toLocaleDateString()}</p>
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={{
                            before: packageData ? new Date(packageData && packageData[0]?.start_date) : new Date(),
                            after: packageData ? new Date(packageData && packageData[0]?.end_date) : new Date(),
                          }}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-xl font-semibold">Quantity</p>
                  <div className="flex items-center gap-4 rounded-full border-[1px] p-2 px-4 lg:w-1/3">
                    <p>Person</p>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                      className="p-2"
                    >
                      <Plus />
                    </Button>
                    <p>{quantity}</p>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      className="p-2"
                    >
                      <Minus />
                    </Button>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="justify-between md:flex">
                  <div className="mb-4 md:mb-0">
                    <p className="text-2xl font-semibold">
                      PHP{" "}
                      {Number(packageData && packageData[0]?.package_type[indexPackage].price_per_person) *
                        quantity}
                    </p>
                    <p>Check all required fields before proceeding</p>
                  </div>
                  <Button
                    variant={"outline"}
                    className="h-full w-full bg-teal-500 px-10 text-black sm:w-auto"
                    onClick={() => {
                      navigate("/booking");
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border-[1px] p-8">
              <p className="pb-4 text-xl font-semibold" id="reviews">
                Reviews
              </p>
            </div>
          </div>
          <div className="mt-4 h-full rounded-2xl border-[1px] p-8 lg:sticky lg:top-20 lg:mt-0 lg:w-1/3">
            <p className="pb-4 text-xl font-semibold">Package Type Itinerary</p>
            <div>
              {packageData && packageData[0]?.package_type[indexPackage]?.package_route_point?.map(
                (routePoints, index) => {
                  return (
                    <div
                      key={index}
                      className="mb-4 flex flex-col gap-2 rounded-xl border-[1px] p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex gap-4 rounded-xl border-[1px] p-2 px-4">
                          <p className="border-r-2 pr-4">Route {routePoints.point_number}</p>
                          <p>Day {routePoints.day}</p>
                        </div>
                      </div>
                      <div className="flex justify-between gap-2">
                        <MapPin />
                        <div className="flex w-full justify-between">
                          <p>{routePoints.location}</p>
                          <p>
                            {new Date(`1970-01-01T${routePoints.start_time}`).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>{routePoints.description}</p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackagePage;
