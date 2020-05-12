const uuid = require('uuid');
const knexConfig = require("../knexfile")
const knex = require('knex')(knexConfig.development)

class Table {
    
    constructor(tablename) {
        this._tablename = tablename;
        this._knex = knex;
        this._table = this._knex(tablename);
    }
    
    async _execute(query) {
        // console.log(query);
        try {
            let dbres = await knex.raw(query).catch(err=>console.log('err ', err));
            // console.log(dbres.rows);
            return dbres;
            
        } catch (error) {
            throw new Error(error)
        }
        
    }

    async save(data) {
        try {
            const res = await this._knex(this._tablename).insert(data)
            return res            
        } catch (error) {
            return { error: true, msg: `error inserting data  ${error}`}
        }
    }
    
    async del(id) {
        let sql = `DELETE from "${this._tablename}" WHERE id= '${id}';`
        let dbres = await this._execute(sql);
        return dbres;
    }

    async update(id, data) {
        let res = this._knex(this._tablename).where({p_id: id}).update(data)
        return res
    }
    
    async find(field, value) {
        let query = `SELECT * FROM "${this._tablename}" WHERE ${field} = '${value}';`;
        let dbres = await this._execute(query);
        // console.log("dbres: ...", dbres)
        return dbres;
    }


    async findAllJoin(joiningTable) {
        try {
            let res = await this._knex(this._tablename).join(`${joiningTable}`, `${this._tablename}.p_id`, '=', `${joiningTable}.p_id`)
            console.log("####res... ", res)
            return res            
        } catch (error) {
            console.log("eerror: ", error)
        }
    }
    
    async findall(skip, limit, exceptionids = false) {
        let query = `SELECT *
        FROM "${this._tablename}"`;
        
        if (exceptionids) {
            query = query + `WHERE id NOT IN (${exceptionids.map(id => `'${id}'`)})`;
        }
        
        // query = query + `OFFSET ${skip} LIMIT ${limit};`;
        let dbres = await this._execute(query);
        return dbres;
    }
    
}

module.exports = Table