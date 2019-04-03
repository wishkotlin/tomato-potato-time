import AV from "leancloud-storage";

var APP_ID = "CiBdkgBstlDo105m1P2Ec6L9-gzGzoHsz";
var APP_KEY = "mmhEWPcr3q1kkHucIsTyLPRv";

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

export function signUp(email:any, username:any, password:any, successFn:any, errorFn:any) {
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.setEmail(email);
  user.signUp().then(
    function(loginedUser) {
      let user = getUserFromAVUser(loginedUser);
      successFn.call(null, user);
    },
    function(error) {
      errorFn.call(null, error);
    }
  );

  return undefined;
}

export function ownUser() {
  let user = AV.User.current();
  // console.log(user);
  if (user) {
    return getUserFromAVUser(user);
  } else {
    return {};
  }
}

function getUserFromAVUser(AVUser:any) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  };
}

export function signOut() {
  AV.User.logOut();
  return undefined;
}

export function signIn(username:any, password:any, successFn:any, errorFn:any) {
  AV.User.logIn(username, password).then(
    function(loginedUser) {
      let user = getUserFromAVUser(loginedUser);
      successFn.call(null, user);
    },
    function(error) {
      errorFn.call(null, error);
    }
  );
}

export const TodoModel = {
  getByUserTodo(user:any, successFn:any, errorFn:any) {
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query("Todo");
    query.find().then(
      response => {
        let array = response.map((t:any) => {
          return { id: t.id, ...t.attributes };
        });
        successFn.call(null, array);
      },
      error => {
        errorFn && errorFn.call(null, error);
      }
    );
  },


  getByUserTomato(user:any, successFn:any, errorFn:any) {
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query("Tomato");
    query.find().then(
      response => {
        let array = response.map((t:any) => {
          return { id: t.id, ...t.attributes };
        });
        successFn.call(null, array);
      },
      error => {
        errorFn && errorFn.call(null, error);
      }
    );
  },

  create({ value,checked }:any, successFn:any, errorFn:any) {
    let Todo = AV.Object.extend("Todo"); 
    let todo = new Todo();
    todo.set("value", value);
    todo.set("checked", checked);
    // todo.set("deleted", deleted);

    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    // acl.setWriteAccess(AV.User.current(), true)
    todo.setACL(acl);


    todo.save().then(
      function(response:any) {
        console.log("存储成功后返回的id",response.id)
        successFn.call(null, response.id);
      },
      function(error:any) {
        errorFn && errorFn.call(null, error);
      }
    );
  },


  createTomato({ value,del }:any, successFn:any, errorFn:any) {
    let Todo = AV.Object.extend("Tomato"); 
    let todo = new Todo();
    todo.set("value", value);
    todo.set("del", del);
    // todo.set("deleted", deleted);

    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    // acl.setWriteAccess(AV.User.current(), true)
    todo.setACL(acl);


    todo.save().then(
      function(response:any) {
        console.log("存储成功后返回的id",response.id)
        successFn.call(null, response.id);
      },
      function(error:any) {
        errorFn && errorFn.call(null, error);
      }
    );
  },


  createComplate({ value,checked }:any, successFn:any, errorFn:any) {
    let Todo = AV.Object.extend("Complate"); 
    let todo = new Todo();
    todo.set("value", value);
    todo.set("checked", checked);
    // todo.set("deleted", deleted);

    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    // acl.setWriteAccess(AV.User.current(), true)
    todo.setACL(acl);


    todo.save().then(
      function(response:any) {
        console.log("存储成功后返回的id",response.id)
        successFn.call(null, response.id);
      },
      function(error:any) {
        errorFn && errorFn.call(null, error);
      }
    );
  },

  // update() {},
  update({id, value, checked}:any, successFn:any, errorFn:any){
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
    let todo = AV.Object.createWithoutData('Todo', id)
    value !== undefined && todo.set('value', value)
    checked !== undefined && todo.set('checked', checked)
    // deleted !== undefined && todo.set('deleted', deleted)
    // 为什么我要像上面那样写代码？
    // 考虑如下场景
    // update({id:1, title:'hi'})
    // 调用 update 时，很有可能没有传 status 和 deleted
    // 也就是说，用户只想「局部更新」
    // 所以我们只 set 该 set 的
    // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
    // 考虑如下场景
    // update({id:1, title: '', status: null}}
    // 用户想将 title 和 status 置空，我们要满足
    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },
  // destroy() {}
  destroy(todoId:any, successFn:any, errorFn:any){
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象
    let todo = AV.Object.createWithoutData('Todo', todoId)
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  }
};

export function sendPasswordResetEmail(email:any, successFn:any, errorFn:any) {
  AV.User.requestPasswordReset(email).then(
    function(success) {
      console.log(success);
      // alert("发送成功");
      successFn.call(null,success);
    },
    function(error) {
      console.dir(error);
      errorFn.call(null, error);
    }
  );
}
