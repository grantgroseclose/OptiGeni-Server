module.exports = schema => (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
        console.log(result.error.details);
        return res.status(400).send({ error: result.error.details[0].message });
    }

    next();
};