const sql = require('./connection');

const Word = function (word) {
    this.idx = word.idx;
    this.word = word.word;
    this.detail = word.detail;
    this.favorite = word.favorite;
};

Word.lookUp = (word, result) => {
    sql.query(`SELECT word FROM tbl_edict WHERE word LIKE "${word}%"`, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('found list of word: ', res);
            result(null, res);
            return;
        }
        result({kind: 'not_found'}, null);
    });
};

Word.search = (word, result) => {
    sql.query(`SELECT detail FROM tbl_edict WHERE word = "${word}"`, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('found word: ', res);
            result(null, res);
            return;
        }
        result({kind: 'not_found'}, null);
    });
    sql.query(`UPDATE tbl_edict SET recent = current_time() WHERE word = "${word}"`);
};

Word.showFavorite = (result) => {
    sql.query(`SELECT word, substring_index(substr(detail, position('/' IN detail)), '{', 1) as pronunciation, substring_index(substr(detail, position('-' IN detail)), '{', 1) as subMeaning FROM tbl_edict WHERE favorite = 1`, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('found favorite words: ', res);
            result(null, res);
            return;
        }
        result({kind: 'not_found'}, null);
    });
};

Word.like = (word, result) => {
    sql.query(`UPDATE tbl_edict SET favorite = 1 WHERE word = '${word}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("add to favorite: ", word);
        result(null, word);
    })
}

Word.unlike = (word, result) => {
    sql.query(`UPDATE tbl_edict SET favorite = 0 WHERE word = '${word}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("remove from favorite: ", word);
        result(null, word);
    })
}

Word.recent = (result) => {
    sql.query(`SELECT word, substring_index(substr(detail, position('/' IN detail)), '{', 1) AS pronunciation, substring_index(substr(detail, position('-' IN detail)), '{', 1) AS subMeaning FROM tbl_edict WHERE recent IS NOT NULL ORDER BY recent DESC LIMIT 20`, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('found recent words: ', res);
            result(null, res);
            return;
        }
        result({kind: 'not_found'}, null);
    })
}

Word.add = (newWord, result) => {
    sql.query(`SELECT idx FROM tbl_edict WHERE word = "${newWord.word}"`, (err, res) => {
        if (res.length) {
            console.log('found word: ', res);
            result( {kind: 'exists'},null);
            return;
        }
        sql.query(`INSERT INTO tbl_edict(word, detail) VALUES ('${newWord.word}', '${newWord.detail}')`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("add word: ", {id: res.insertId, ...newWord});
            result(null, {id: res.insertId, ...newWord});
        });
    });
}

module.exports = Word;
