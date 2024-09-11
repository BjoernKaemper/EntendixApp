export default interface Site {
  id: string;
  data: {
    Address: {
      Street: string;
      Zipcode: string;
      CityTown: string;
      NationalCode: string;
      Longitude: string;
      Lattitude: string;
    }[];
    SiteName: string;
  };
}
