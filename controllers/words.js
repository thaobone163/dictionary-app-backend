const Word = require('../models/words');

exports.lookUp = (req, res) => {
    Word.lookUp(req.params.word, (err, data) =>{
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found list of word`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    });
};

exports.search = (req, res) => {
    Word.search(req.params.word, (err, data) =>{
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found this ${req.params.word}`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    });
};

exports.showYourWord = (req, res) => {
    Word.showYourWord((err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    })
}

exports.showFavorite = (req, res) => {
    Word.showFavorite((err, data) =>{
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    });
};

exports.like = (req, res) => {
    Word.like(req.params.word, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found this ${req.params.word}`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    })
}

exports.unlike = (req, res) => {
    Word.unlike(req.params.word, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found this ${req.params.word}`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    })
}

exports.recent = (req, res) => {
    Word.recent((err, data) =>{
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send(data);
    });
};

exports.add = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const word =  new Word({
        word: req.body.word,
        detail: ' ' + req.body.pronunciation + '{"\n"}' + req.body.meaning,
        synonym: req.body.synonym,
        antonyms: req.body.antonyms
    })

    Word.add(word, (err, data) => {
        if (err)
            if(err.kind === 'exists') {
                res.send({
                    message: `This word already exists`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the Word."
                });
            }
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    Word.delete(req.params.word, (err, data) => {
        if(err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found or cannot delete this word`
                });
            } else {
                res.status(500).send({
                    message: 'Error'
                });
            }
        } else res.send({
            message: `Deleted word ${req.params.word}`
        });
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const word =  new Word({
        word: req.body.word,
        detail: ' ' + req.body.pronunciation + '{"\n"}' + req.body.meaning,
        synonym: req.body.synonym,
        antonyms: req.body.antonyms
    })

    Word.update(req.params.currentWord, word, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found word or cannot change.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating word"
                });
            }
        } else res.send(data);
    });
};
