var builderList = builder.create('XML', { 'Type': 'ListBuilder' })
    .e('Order', { 'No': '123', 'DispDate': '05.09.2013', 'Basket': '123' })
    .e('Head')
    .up()
    .e('BuilderList');

for (var i = 0; i < 3; i++) {
    builderList.e('Set', { 'LineNo': '1' })
        .e('Pname', 'type')
        .up()
        .e('Count', '1')
        .up()
        .e('PVarString', 'something')
        .up()
        .e('ARTICLE_TEXT_INFO1', 'info1')
        .up()
        .e('ARTICLE_TEXT_INFO2', 'info2')
}

var xml = builderList.end({ pretty: true });