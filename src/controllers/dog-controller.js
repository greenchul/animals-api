const sendOKandHello = (request, response) => {
  response.status(200).send("hello");
};

module.exports = sendOKandHello;
