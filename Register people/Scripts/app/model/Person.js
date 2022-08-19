Ext.define('PersonApp.model.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'int'
    }, {
        name: 'LastName',
        type: 'string',
    },{
        name: 'FirstName',
        type: 'string',
    }, {
        name: 'Patronymic',
        type: 'string',
    },{
        name:'Birthdate',
        type:'date',
        dateformat:'d.m.Y'
    }]
});