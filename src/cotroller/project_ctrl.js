const ser = require("../service/project_service");

const views = {
    main : (req, res)=> {
        res.render("main");
    },
    login : (req, res) => {
        res.render("login");
    },
    boardList : async (req, res) => {
        console.log("123")
        const list = await ser.pageRead.boardList();
        console.log(list);
        // const totalContent = awqit ServiceWorker.pageRead.totalContent();
        // const data = await ServiceWorker.pageRead.list(req.query.start, totalContent);
        res.render("board/boardList", {list});
    },
    writeForm : (req, res) =>{
        // console.log("ctrl writeForm", req.params);
        // res.render("board/write_form", req.params);
        console.log("ctrl writeForm");
        res.render("board/write_form");
    },
    modifyForm : async(req, res) =>{
        console.log("ctrl modifyForm: ", req.params.num);
        const result = await ser.pageRead.content(req.params.num);
        res.render("board/modify_form", {result});
    },
    content : async(req, res)=> {
        console.log("ctrl content: ", req.params);
        console.log("ctrl content: ", req.params.num);
        const result = await ser.pageRead.content(req.params.num);
        console.log(result);
        res.render("board/content", {result });
    }
}
const process  = {
    loginChk : async (req, res) => {
        console.log("req.body : ", req.body);
    },
    write : async (req, res) => {
        console.log("ctrl write: ", req.body);
        const msg = await ser.pageInsert.write(req.body);
        res.redirect("/boardList");
    },
    modify : async (req, res) => {
        console.log("ctrl modify", req.body);
        const msg = await ser.pageModify.modify(req.body);
        res.redirect("/boardList");
    }
}

module.exports = {views, process}