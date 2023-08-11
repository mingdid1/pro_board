const oracledb = require("oracledb");
const dbConfig = require("../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const daoRead = {
    boardList : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const result = await con.execute("select * from proBoard");
        console.log("dao", result);
        return result;
    },
    content : async (num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from proBoard where num='${num}'`;
        const data = await con.execute(sql);
        return data;
    },
    totalContent : async ()=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select count(*) from proBoard`;
        const totalContent = await con.execute(sql);
        return totalContent;
    }
}

const daoInsert = {
    write : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `insert into proboard(num, id, title, content, dates, filename) values(proboard_seq.nextval, :id, :title, :content, sysdate, :filename)`;
        let result;
        try {
            result = await con.execute(sql, body);
        }catch (err){
            console.log(err);
        }
    },
}

const daoModify = {
    modify : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update proboard set title='${title}', content='${content}, filename='${filename}' where num='${num}`;
    }

}
module.exports = {daoRead, daoInsert, daoModify};