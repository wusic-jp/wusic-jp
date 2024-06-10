const firebaseConfig = {
    apiKey: "AIzaSyBTFrLmwrZu3eaQhzspHG0vtDiekJ1kO8I",
    authDomain: "wusic-8fc60.firebaseapp.com",
    projectId: "wusic-8fc60",
    storageBucket: "wusic-8fc60.appspot.com",
    messagingSenderId: "197632152204",
    appId: "1:197632152204:web:c564ccd38a0d3f74be61a9",
    measurementId: "G-QNDKH4T49M"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let get_object = [];
let insert_data = '';

// Firestoreからの取得並びに整形。
db.collection('events').orderBy('date', 'desc').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        get_object.push(doc.data());
    })
}).then(() => {
    const sorted_result = [get_object[0], get_object[1], get_object[2]];
    console.log(sorted_result);
    return sorted_result
}).then((sorted_result) => {
    for(var work of sorted_result){
        insert_data += '<div class="events-article"><div class="article-head"><div class="section-head-left"></div><div class="section-head-center"><p class="date">' + formatDate(work.date) + '</p><p class="event-title">' + work.name + '</p></div><div class="event-link">' + generateEventLink(work.url) + '</div></div><p class="description">' + work.desc + '</div>'
    }
    return insert_data
}).then((insert_data) => {
    document.getElementById('events-generated-html').innerHTML = insert_data;
});

var DAYS = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

// yyyy-mm-ddの形式で年月日を受け取り、yyyy年mm月dd日(曜日)の形式で返却する
function formatDate(date_object) {
    const date = new Date(date_object.seconds * 1000);
    const month = date.getMonth() + 1;
    const formattedDate = date.getFullYear() + '年' + month + '月' + date.getDate() + '日' + DAYS[date.getDay()];
    return formattedDate
}

// urlを受け取ってhtmlを返す
function generateEventLink(url) {
    if(url === ''){
        return ''
    } else {
        return '<a href="' + url + '" target="_blank"><img src="img/link-icon.png" alt="event-link"></a>'
    }
}