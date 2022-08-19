Ext.define('PersonApp.view.PersonSearch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personsearch',
    flex: 1,
    title: 'Поиск',
    bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '95%'
    },
    defaultType: 'textfield',
    items: [{
        fieldLabel: 'Фамилия',
        name: 'LastName',
        maskRe: /[а-яА-Я -*]/,
        regex:/^([а-яА-Я*]+[ -]?[а-яА-Я*]+)$/,
        invalidText:"Для поиска пользователей используйте символы кириллицы. Если ФИО двойное, то запишите через ' ' или '-'. Для совпадений используйте *",
        maxLength:25,
        maxLengthText:"Введите меньше 25 символов кириллицы",
    },{
        fieldLabel: 'Имя',
        name: 'FirstName',
        maskRe: /[а-яА-Я -*]/,
        regex:/^([а-яА-Я*]+[ -]?[а-яА-Я*]+)$/,
        invalidText:"Для поиска пользователей используйте символы кириллицы. Если ФИО двойное, то запишите через ' ' или '-'. Для совпадений используйте *",
        maxLength:25,
        maxLengthText:"Введите меньше 25 символов кириллицы",
    }, {
        fieldLabel: 'Отчество',
        name: 'Patronymic',
        maskRe: /[а-яА-Я -*]/,
        regex:/^([а-яА-Я*]+[ -]?[а-яА-Я*]+)$/,
        invalidText:"Для поиска пользователей используйте символы кириллицы. Если ФИО двойное, то запишите через ' ' или '-'. Для совпадений используйте *",
        maxLength:25,
        maxLengthText:"Введите меньше 25 символов кириллицы",
    },
        {
        xtype: 'datefield',
        fieldLabel: 'Начало периода даты рождения',
        name: "Start",
        maxValue: new Date(),
        maxText:"Дата должна быть равна или меньше "+Ext.Date.format(new Date(),'d.m.Y'),
        format: 'd.m.Y',
        maskRe: /[0-9.]/
    }, {
        xtype: 'datefield',
        fieldLabel: 'Окончание периода даты рождения',
        name: "End",
        maxValue: new Date(),
        invalidText:"Запишите дату в формате 'xx.xx.xxxx'",
        maxText:"Дата должна быть равна или меньше "+Ext.Date.format(new Date(),'d.m.Y'),
        format: 'd.m.Y',
        maskRe: /[0-9.]/
    }, {
        xtype: 'button',
        text: 'Сбросить',
        handler: function () {
            this.up('form').getForm().reset();
        },
    },
    {
        xtype: 'button',
        text: 'Поиск',
        formBind: true, 
        closable: false,
        disabled: false,
        action: 'search',
    }],
});