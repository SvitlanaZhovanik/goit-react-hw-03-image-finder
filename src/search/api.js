const axios = require("axios");
const KEY = "24180834-bc46a9e187b5aa650e79cc709";
export const getImg = async (search, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  return response.data.hits;
};

export default getImg;
