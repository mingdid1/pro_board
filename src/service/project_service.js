const pDAO = require("../database/project_dao");

const pageRead = {
    boardList : async () =>{
        console.log("456")
        const list = await pDAO.daoRead.boardList();
        console.log("ser: ", list);
        return list.rows;
    },
    content : async (num) => {
        console.log("ser content: ", num);
        const data = await pDAO.daoRead.content(num);
        console.log("content : ", data);
        return data.rows[0];
    }
}

const getMessage = (msg, url)=> {
    return `<script>
                alert("${msg}");
                location.href="${url}"
            <script>`;
}

const pageInsert = {
    write : async (body) => {
        const result = await pDAO.daoInsert.write(body);
        console.log("ser write: ", result);
        let msg="", url="";
        if (result == 0){
            msg="문제 발생";
            url="/board/write_form?id="+body.id;
        }else {
            msg="등록되었습니다";
            url="/board/content/"+body.id;
        }
        return getMessage(msg, url);
    }
}

const pageModify = {
    modify : async (body) => {
        const result = await pDAO.daoModify.modify(body);

        let msg="", url="";
        if (result == 0){
            msg="문제 발생";
            url="/board/modify_from?id="+body.id;
        }else {
            msg="수정되었습니다";
            url="/board/content/"+body.id;
        }
        return getMessage(msg, url);
    }
}

module.exports = {pageRead, pageInsert, pageModify};