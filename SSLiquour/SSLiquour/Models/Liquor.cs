namespace SSLiquour.Models
{
    public class Liquor
    {
        public int Id{ get; set; }
        public string Name { get; set; }
        public string brand { get; set; }
        public string category { get; set; }
        public string abv { get; set; }
        public string volume { get; set; }
        public string CountryOfOrigin { get; set; }
        public int stockAmount { get; set; }
        public string Price { get; set; }
        public int UserID { get; set; }
    }
}