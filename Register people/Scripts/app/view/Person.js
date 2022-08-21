Ext.define('PersonApp.view.Person', {
    extend: 'Ext.window.Window',
    alias: 'widget.personwindow',
    closable: false, 
    title: 'Гражданин',
    layout: 'fit',
    autoShow: true,
    modal: true,    
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            items: [{
                xtype: 'textfield',
                name: 'LastName',
                fieldLabel: 'Фамилия',
                regex:/^([а-яА-Я]+[ -]?[а-яА-Я]+)$/,
                blankText:"Для добавления/изменения пользователя должны быть заполнены все строчки.",
                invalidText:"Для добавления/изменения пользователя используйте символы кириллицы. Если ФИО двойное, то запишите через ' ' или '-'",
                allowBlank: false,
                minLength:2,
                maxLength:25,
                minLengthText:"Введите больше 2 символов кириллицы",
                maxLengthText:"Введите меньше 25 символов кириллицы",
                maskRe: /[а-яА-Я -]/

            },{
                xtype: 'textfield',
                name: 'FirstName',
                fieldLabel: 'Имя',
                regex:/^([а-яА-Я]+[ -]?[а-яА-Я]+)$/,
                allowBlank: false,
                blankText:"Для добавления/изменения пользователя должны быть заполнены все строчки.",
                invalidText:"Для добавления/изменения пользователя используйте символы кириллицы. Если ФИО двойное, то запишите через ' ' или '-'",
                minLength:2,
                maxLength:25,
                minLengthText:"Введите больше 2 символов кириллицы",
                maxLengthText:"Введите меньше 25 символов кириллицы",
                maskRe: /[а-яА-Я -]/
            },{
                xtype: 'textfield',
                name: 'Patronymic',
                fieldLabel: 'Отчество',
                regex:/^([а-яА-Я]+[ -]?[а-яА-Я]+)$/,
                blankText:"Для добавления/изменения пользователя должны быть заполнены все строчки.",
                invalidText:"Для добавления/изменения пользователя используйте символы кириллицы. Если ФИО двойное, то запишите через ' ' или '-'",
                minLength:2,
                maxLength:25,
                minLengthText:"Если отчество отсутвует, оставьте данное поле пустым, иначе введите больше 2 символов кириллицы",
                maxLengthText:"Введите меньше 25 символов кириллицы",
                maskRe: /[а-яА-Я -]/
            },{
                xtype: 'datefield',
                name: 'Birthdate',
                allowBlank: false,
                maxText:"Дата должна быть равна или меньше "+Ext.Date.format(new Date(),'d.m.Y'),
                blankText:"Для добавления/изменения пользователя должны быть заполнены все строчки.",
                invalidText:"Запишите дату в формате 'xx.xx.xxxx'",
                format: 'd.m.Y',
                fieldLabel: 'Дата рождения',
                maxValue: new Date(),
                maskRe: /[0-9.]/
            },]
        },];
        this.buttons = [{
            text: 'Выход',
            formBind: true,
            scope: this,
            action: 'exit',
        },{
            text: 'сбросить',
            scope: this,
            handler: function () {
                this.down('form').getForm().reset();
            }
        }];
        this.callParent(arguments);
    }  
});