Ext.define('PersonApp.controller.Persons', {
    extend: 'Ext.app.Controller',
    alias: 'controller.persons',
    views: ['PersonList', 'Person', 'PersonPanel', 'PersonSearch','PersonSmallPanel'],
    stores: ['PersonStore'],
    models: ['Person'],
    init: function () {
        this.control({
            'personsmallpanel button[action=editPerson]': {
                click: this.editPerson
            },
            'personsmallpanel button[action=addPerson]': {
                click: this.addPeson
            },            
            'personsmallpanel button[action=deletePerson]': {
                click: this.deletePerson
            },
            'personwindow button[action=exit]':{
                click: this.exit
            },
            'personsearch button[action=search]':{
                click: this.search
            },
            'personsmallpanel button[action=printPersons]':{
                click: this.printPersons
            },
            'personsmallpanel button[action=exitSearch]':{
                click: this.exitSearch
            },
        });
    },
    exitSearch:function (button){
        Ext.Msg.show({
                title: 'Предупреждение',
                msg: "Реестр граждан будет закрыт. Вы уверены?",
                buttons: Ext.Msg.YESNO,
                scope:this,
                disabled: false,
                closable: false,
                buttonText: {
                    yes: 'Да',
                    no: 'Нет'
                },fn: function (btnText) {
                    if (btnText === "yes") {
                        button.up('personpanel').close();
                    }
                }
        })
    },
    deletePerson: 
        function (){
            var record = Ext.getCmp('membergrid').getView().getSelectionModel().getSelection()[0];
            if (!(typeof record == "undefined")) {
                Ext.Msg.show({
                    title: 'Предупреждение',
                    msg: "Данный гражданин будет удален навсегда. Вы уверены?",
                    buttons: Ext.Msg.YESNO,
                    scope:this,
                    disabled: false,
                    closable: false,
                    buttonText: {
                        yes: 'Да',
                        no: 'Нет'
                    },
                    fn: function (btnText) {
                        if (btnText === "yes") {
                            this.requestDelete(record)
                        } 
                    }
                });                              
            }
            else {
                Ext.Msg.alert("Предупреждение","Выберите строчку!")
            }
    },
    editPerson: function () {
        var record = Ext.getCmp('membergrid').getSelectionModel().getSelection()[0];
        if (!(typeof record == "undefined")) {
            var view = Ext.widget('personwindow');
            view.down('form').getForm().loadRecord(record);
        }
        else {
            Ext.Msg.alert("Предупреждение","Выберите строчку!")
        }
    },
    addPeson: function () {
        Ext.widget('personwindow');
    },
    exit: function (button){
        var window = button.up('window')
        var form = window.down('form').getForm()
        if (form.isDirty()) {
            if (form.isValid()) {
                if (form.getRecord() === undefined) {
                    Ext.Msg.show({
                        closable: false,
                        title: 'Предупреждение',
                        msg: 'Добавить данного пользователя?',
                        scope:this,
                        buttons: Ext.Msg.YESNO,
                        buttonText: {
                            yes: 'Да',
                            no: 'Нет'
                        },
                        fn: function (btnText) {
                            if (btnText === "yes") {
                                formRecord = form.getValues();
                                formRecord.FirstName=formRecord.FirstName.toUpperCase();
                                formRecord.LastName=formRecord.LastName.toUpperCase();
                                formRecord.Patronymic=formRecord.Patronymic.toUpperCase();
                                formRecord.Birthdate = Ext.Date.parse(formRecord.Birthdate, "d.m.Y")
                                this.requestCheck(this.requestCreate,formRecord)
                            } else {
                                window.close();
                            }
                        }
                    });
                    window.close();
                } else {
                    var record = Object.assign({}, Ext.getCmp('membergrid').getSelectionModel().getSelection()[0].data);
                    var formRecord = Object.assign({Id: record.Id}, form.getValues());
                    formRecord.FirstName=formRecord.FirstName.toUpperCase();
                    formRecord.LastName=formRecord.LastName.toUpperCase();
                    formRecord.Patronymic=formRecord.Patronymic.toUpperCase();
                    formRecord.Birthdate = Ext.Date.parse(formRecord.Birthdate, "d.m.Y")
                    if (JSON.stringify(record) === JSON.stringify(formRecord)) {
                        window.close();
                    } else {
                        Ext.Msg.show({
                            closable: false,
                            title: 'Предупреждение',
                            msg: 'Данные изменены. Сохранить изменения?',
                            scope:this,
                            buttons: Ext.Msg.YESNO,
                            buttonText: {
                                yes: 'Да',
                                no: 'Нет'
                            },
                            fn: function (btnText) {
                                if (btnText === "yes") {
                                    this.requestCheck(this.requestEdit,formRecord)
                                }
                            }
                        });
                        window.close();
                    }
                }
            } else {
                Ext.Msg.alert('Ошибка','Проверьте введенные данные!');
            }
        }else{
            window.close();
        }
    },
    search:function (button){
        var form = button.up('personsearch').getForm()

        if (form.isValid()) {
            if (!form.isDirty()) {
                Ext.Msg.show({
                    title: 'Предупреждение',
                    msg: "Форма пустая, вывести все анкеты?",
                    buttons: Ext.Msg.YESNO,
                    scope:this,
                    closable: false,
                    buttonText: {
                        yes: 'Да',
                        no: 'Нет'
                    },fn: function (btnText) {
                        if (btnText === "yes") {
                            this.requestAllPersons();
                        }
                    }
                });
            } else {
                var record = Object.assign({},form.getValues())
                if ((record.Start==='') || (record.End==='') || (Ext.Date.parse(record.Start, "d.m.Y")<=Ext.Date.parse(record.End, "d.m.Y"))){
                    record.FirstName =record.FirstName.trim().replace(/\s+/g, ' ')
                    record.LastName =record.LastName.trim().replace(/\s+/g, ' ')
                    record.Patronymic =record.Patronymic.trim().replace(/\s+/g, ' ')
                    this.requestAskedPersons(record)
                }
                else {
                    Ext.Msg.alert('Предупреждение', 'Сделайте "Начало даты"<="Конец даты"');
                }
            }
        }
    },
    printPersons: function () {
        Ext.Msg.show({
                closable: false,
                title: 'Предупреждение',
                msg: 'Отчет будет сделан по списку с сайта. Продолжить?',
                scope:this,
                buttons: Ext.Msg.YESNO,
                buttonText: {
                    yes: 'Да',
                    no: 'Нет'
                },fn: function (btnText) {
                if (btnText === "yes") {
                    var form =Ext.create('Ext.form.Panel', {
                        standardSubmit: true,
                        url: 'Report/Generate',
                    })
                    form.submit({
                        target : '_blank',
                        params:{persons:this.fromGridToJson()},
                    });
                }
            }
        })

    },
    fromGridToJson:function (){
        var persons = [];
        Ext.getCmp('membergrid').getStore().each( function (model) {
            persons.push(model.data);
        });
        return JSON.stringify(persons)
    },
    requestCreate: function (formRecord){
        Ext.Ajax.request({
            url: 'Person/CreatePerson',
            method: 'Post',
            timeout: 60000,
            jsonData: {
                person: formRecord
            },
            success: function (response) {
                var status = Ext.decode(response.responseText);
                if (status === -2) {
                    Ext.Msg.alert('Ошибка -2', 'Проблемы с бд');
                } else {
                    var grid = Ext.getCmp('membergrid');
                    formRecord.Id = status;
                    grid.store.add(formRecord)
                }

            },
            failure: function (response) {
                Ext.Msg.alert('Ошибка', 'Не удалось отправить данные!');
            }
        });
    },
    requestEdit:function (formRecord){
        Ext.Ajax.request({
            url: 'Person/EditPerson/',
            method: 'Post',
            timeout: 60000,
            jsonData: {
                person: formRecord
            },
            success: function (response) {
                var status = Ext.decode(response.responseText);
                switch (status) {
                    case 2:
                        Ext.Msg.alert('Успешно', 'Данный гражданин изменен');
                        Ext.getCmp('membergrid').getSelectionModel().getSelection()[0].set(formRecord);
                        break;

                    case -1:
                        Ext.Msg.alert('Ошибка -1', 'Данный гражданин не найден');
                        break;
                    case -2:
                        Ext.Msg.alert('Ошибка -2', 'Проблема с подключением к бд');
                        break;
                    default:
                        break
                }
            },
            failure: function (response) {
                Ext.Msg.alert('Ошибка', 'Не удалось отправить данные!');
            }
        })
    },
    requestCheck: function (request,formRecord){
        Ext.Ajax.request({
            url: 'Person/CheckPerson',
            method: 'Post',
            timeout: 60000,
            scope:this,
            jsonData: {
                person: formRecord
            },
            success: function (response) {
                var status = Ext.decode(response.responseText);
                switch (status) {
                    case 1:
                        Ext.Msg.show({
                            closable: false,
                            title: 'Предупреждение',
                            msg: 'Гражданин с такими данными уже есть.Продолжить операцию?',
                            buttons: Ext.Msg.YESNO,
                            scope:this,
                            buttonText: {
                                yes: 'Да',
                                no: 'Нет'
                            },fn: function (btnText) {
                                if (btnText === "yes") {
                                    request(formRecord)
                                }
                            }
                        })
                        break;

                    case -1:
                        request(formRecord)
                        break;
                    case -2:
                        Ext.Msg.alert('Ошибка -2', 'Проблема с подключением к бд');
                        break;
                    default:
                        break
                }
            },
            failure: function (response) {
                Ext.Msg.alert('Ошибка', 'Не удалось отправить данные!');
            }
        });
    },
    requestDelete:function (record){
        Ext.Ajax.request({
            url: 'Person/DeletePerson/'+record.data.Id,
            method: 'Get',
            timeout: 60000,
            headers:
                {
                    'Content-Type': 'application/json'
                },
            success: function (response) {
                var status = Ext.decode(response.responseText);
                switch(status) {
                    case 2:
                        Ext.Msg.alert('Успешно', 'Данный гражданин удален');
                        var store = Ext.getCmp('membergrid').getStore()
                        store.remove(record);
                        break;
                    case -1:
                        Ext.Msg.alert('Ошибка -1', 'Данный гражданин не найден');
                        break;
                    case -2:
                        Ext.Msg.alert('Ошибка -2', 'Проблема с подключением к бд');
                        break;
                    default:
                        break
                }
            },
            failure: function (response) {
                Ext.Msg.alert('Ошибка', 'Запрос провалился');
            }
        });
    },
    requestAllPersons:function (){
        Ext.Ajax.request({
            url: 'Person/AllPersons',
            method: 'Get',
            timeout: 60000,
            success: function (response) {
                var status = Ext.decode(response.responseText);
                if (!(status===-2)){
                    var grid = Ext.getCmp('membergrid');
                    grid.store.removeAll();
                    grid.store.add(status)
                }
                else {
                    Ext.Msg.alert('Ошибка -2', 'Проблемы с бд');
                }
            },
            failure: function (response) {
                Ext.Msg.alert('Ошибка', 'Запрос провалился');
            }
        });
    },
    requestAskedPersons:function (record){
        Ext.Ajax.request({
            url: 'Person/AskedPersons',
            method: 'Post',
            timeout: 60000,
            jsonData: {
                parameters: record
            },
            success: function (response) {
                var status = Ext.decode(response.responseText);
                if (!(status===-2)){
                    var grid = Ext.getCmp('membergrid');
                    grid.store.removeAll();
                    grid.store.add(status)
                }
                else{
                    Ext.Msg.alert('Ошибка -2', 'Проблемы с бд');
                }
            },
            failure: function (response) {
                Ext.Msg.alert('Ошибка', 'Запрос провалился');
            }
        });
    }
});