var data = [{
    "id": 1,
    "startTime": "2017-12-12 10:36:50",
    "endTime": "2018-02-02 00:00:00",
    "value": "0.26",
    "jobCode": "zd_test_02_171212103650",
    "status": "正常",
    "machCode": 1
},
{
    "id": 2,
    "startTime": "2018-01-03 00:00:00",
    "endTime": "2018-01-12 00:00:00",
    "value": "0.66",
    "jobCode": "close_test_05_171212103622",
    "status": "调机",
    "machCode": 3
},
{
    "id": 3,
    "startTime": "2018-01-01 00:00:00",
    "endTime": "2018-01-22 00:00:00",
    "value": "0.76",
    "jobCode": "close_test_06_171212103603",
    "status": "修机",
    "machCode": 4
},
{
    "id": 4,
    "startTime": "2018-01-05 00:00:00",
    "endTime": "2018-01-16 00:00:00",
    "value": "0.36",
    "jobCode": "fms_test4_6_171212103510",
    "status": "待机",
    "machCode": 5
},
{
    "id": 5,
    "startTime": "2018-01-08 00:00:00",
    "endTime": "2018-01-29 00:00:00",
    "value": "0.96",
    "jobCode": "zd_test_02_171115174821",
    "status": "修模",
    "machCode": 6
}];
var groups_code = '';
for (var i = 0; i < data.length; i++) {
    groups_code = groups_code + '{"content":"' + data[i].machCode + '","id":"' + data[i].jobCode + '" ,"className":"openwheel"}' + ','
}
//去除最后一个逗号
groups_code = groups_code.substring(0, groups_code.length - 1);
 
groups_code = '[' + groups_code + ']';
//将json 字符串转成json对象
var obj_groups = JSON.parse(groups_code);

console.log(obj_groups);