class ApiFeatures {

    constructor(query, queryString) {

        this.query = query;

        this.queryString = queryString;

    }

    search() {

        if (this.queryString.q) {

            this.query = this.query.find({

                $or: [

                    {
                        title: {
                            $regex: this.queryString.q,
                            $options: "i",
                        },
                    },

                    {
                        description: {
                            $regex: this.queryString.q,
                            $options: "i",
                        },
                    },

                ],

            });

        }

        return this;

    }

    filter() {

        if (this.queryString.tech) {

            this.query = this.query.find({

                techStack: this.queryString.tech,

            });

        }

        return this;

    }

    sort() {

        if (this.queryString.sort === "oldest") {

            this.query =
                this.query.sort({
                    createdAt: 1,
                });

        } else {

            this.query =
                this.query.sort({
                    createdAt: -1,
                });

        }

        return this;

    }

    paginate() {

        const page =
            Number(this.queryString.page) || 1;

        const limit =
            Number(this.queryString.limit) || 10;

        const skip =
            (page - 1) * limit;

        this.query = this.query
            .skip(skip)
            .limit(limit);

        return this;

    }

}

module.exports = ApiFeatures;