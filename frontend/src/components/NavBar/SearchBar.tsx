import { useEffect, useState } from "react";
import { LucideSearch, Search as SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import SearchDestination from "../SearchBar/SearchDestination";
import SearchDate from "../SearchBar/SearchDate";
import SearchPrice from "../SearchBar/SearchPrice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMediaQuery } from "react-responsive";

interface forNavBar {
  navBar: boolean;
  homePage?: boolean;
}

interface Destination {
  description: string;
  image: string;
  name: string;
  Destination: string;
}

function Search({ navBar, homePage }: forNavBar) {
  const [destinations, setDestinationsData] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get("apps/destination/list/");
      setDestinationsData(response.data);
    } catch (err) {}
  };

  const parsedDestinations: Destination[] = destinations;

  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const [secondDate, setSecondDate] = useState<Date>(new Date());

  const [minimumPrice, setMinimumPrice] = useState<number[] | null>([580]);
  const [maximumPrice, setMaximumPrice] = useState<number[] | null>([12000]);

  const [searchItem, setSearchItem] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string | "">("Set Location");
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(parsedDestinations);

  const [locPopoverOpen, setLocPopoverOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = parsedDestinations.filter((destination) => {
      return destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredDestinations(filteredItems);
  };

  const mediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div
      className={
        "gap-4" +
        (navBar
          ? ""
          : "flex items-center justify-center rounded-full border-[1px] bg-[#f4f4f5] dark:bg-[#09090b]")
      }
    >
      <div className={`${navBar ? "" : "flex items-center"} gap-4 ${homePage ? "p-2" : ""}`}>
        {navBar ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className={`w-full flex h-full ${homePage ? " lg:w-full md:w-[450px] sm:w-[400px]" : ""}`}>
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="rounded-full border-[1px] bg-teal-500 p-2 text-black">
                    <LucideSearch className="" />
                  </div>
                  <p className="w-full pr-8 sm:pr-10 md:text-sm text-xs">Search TrailVenture</p>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={
                homePage || mediumScreen
                  ? `t-2 flex w-[330px] flex-col gap-2 rounded-[20px] md:gap-4`
                  : `mt-2 flex w-full flex-row gap-4 rounded-full`
              }
            >
              <SearchDestination
                locPopoverOpen={locPopoverOpen}
                setLocPopoverOpen={setLocPopoverOpen}
                selectedDestination={selectedDestination}
                searchItem={searchItem}
                handleInputChange={handleInputChange}
                filteredDestinations={filteredDestinations}
                setSelectedDestination={setSelectedDestination}
              />
              <SearchDate
                firstDate={firstDate}
                secondDate={secondDate}
                setFirstDate={setFirstDate}
                setSecondDate={setSecondDate}
              />
              <SearchPrice
                minimumPrice={minimumPrice}
                maximumPrice={maximumPrice}
                setMinimumPrice={setMinimumPrice}
                setMaximumPrice={setMaximumPrice}
              />
              <div className="w-full">
                <Button
                  variant="outline"
                  className="h-full w-full bg-teal-500 text-white dark:text-[#09090b]"
                >
                  <Link
                    to={`/search/${selectedDestination}/${firstDate.toLocaleDateString().replace(/\//g, "-")}/${secondDate.toLocaleDateString().replace(/\//g, "-")}/${minimumPrice}/${maximumPrice}`}
                  >
                    <p className="text-md px-2 py-2">Find My Trailventure</p>
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <SearchDestination
              locPopoverOpen={locPopoverOpen}
              setLocPopoverOpen={setLocPopoverOpen}
              selectedDestination={selectedDestination}
              searchItem={searchItem}
              handleInputChange={handleInputChange}
              filteredDestinations={filteredDestinations}
              setSelectedDestination={setSelectedDestination}
            />
            <SearchDate
              firstDate={firstDate}
              secondDate={secondDate}
              setFirstDate={setFirstDate}
              setSecondDate={setSecondDate}
            />
            <SearchPrice
              minimumPrice={minimumPrice}
              maximumPrice={maximumPrice}
              setMinimumPrice={setMinimumPrice}
              setMaximumPrice={setMaximumPrice}
            />
            <Button variant="outline" className="h-full bg-teal-500 text-white dark:text-[#09090b]">
              <Link
                to={`/search/${selectedDestination}/${firstDate.toLocaleDateString().replace(/\//g, "-")}/${secondDate.toLocaleDateString().replace(/\//g, "-")}/${minimumPrice}/${maximumPrice}`}
              >
                {!navBar ? (
                  <p className="text-md px-2 py-2">Find My Trailventure</p>
                ) : (
                  <div className="py-[3px]">
                    <SearchIcon />
                  </div>
                )}
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
export default Search;
