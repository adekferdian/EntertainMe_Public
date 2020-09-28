const axios = require('axios');

class MainController {
    static async getAll (req, res) {
        axios.get('http://localhost:4009/movies')
            .then((movies) => {
                axios.get('http://localhost:4010/tvSeries')
                    .then((tvSeries) => {
                        res.status(200).json({movies: movies.data, tvSeries: tvSeries.data})
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = MainController