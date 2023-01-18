const antiTrollsSecurity = (string) => {
   return string
      .split('')
      .filter((l) => {
         let filtro = !'AaEeIiOoUu'.includes(l);
         return filtro;
      })
      .join('');
};

module.exports = antiTrollsSecurity;
