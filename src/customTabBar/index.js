Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    isModelIPX: Boolean,
    tabbar: {
      type: {
        type: Boolean,
        value: false
      },
      value: {
        backgroundColor: '#ffffff',
        color: '#9b9b9b',
        selectedColor: '#292929',
        list: [
          {
            'pagePath': '/pages/index/index',
            'iconPath': 'icon/nav_button_home_default.png',
            'selectedIconPath': 'icon/nav_button_home_selected.png',
            'text': '首页'
          },
          {
            'pagePath': '/pages/index/mall',
            'iconPath': 'icon/nav_button_shop_default.png',
            'selectedIconPath': 'icon/nav_button_shop_selected.png',
            'text': '商城'
          },
          {
            'pagePath': '/pages/index/printer',
            'iconPath': 'icon/nav_btn_printer_default.png',
            'selectedIconPath': 'icon/nav_btn_printer_selected.png',
            'text': '打印机'
          }
        ]
      }
    }
  },
  data: {
  },
  attached() {
  },
  methods: {
  }
})