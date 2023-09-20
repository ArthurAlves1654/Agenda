// Todas as requisições do site deverão passar pelo middleware 

exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Este é o local da váriavel local'
    next();
};

exports.checkCsrfErro = (err, req, res, next)=> {
    if(err && 'EBADCSRFTOKEN' === err.code ) {
        return res.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}