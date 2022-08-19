Ext.define('PersonApp.store.PersonStore', {
    extend: 'Ext.data.Store',
    model: 'PersonApp.model.Person',
    autoLoad: false,
    storeId: 'PersonStore',
    pageSize:5
});

