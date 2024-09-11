export default interface Company {
  id: string;
  data: {
    CompanyName: string;
    Address: {
      Street: string;
      Zipcode: string;
      CityTown: string;
      NationalCode: string;
    }[];
  };
}
