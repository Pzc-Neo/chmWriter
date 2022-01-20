import { Menu } from 'electron'
// 顶栏菜单
const createMenu = win => {
  // 因为这个菜单项里面的win是在这里定义的，所以这个菜单项要在这里定义。
  const menuTemplate = [
    {
      label: '文件',
      submenu: [
        {
          label: '新建文件',
          // accelerator: process.platform === 'darwin' ? "Alt+Cmd+I" : "CommandOrControl+W",
          accelerator: 'CommandOrControl+ALT+N',
          click: () => {
            win.webContents.send('main_msg', 'new_database')
          }
        },
        {
          label: '打开文件',
          // accelerator: process.platform === 'darwin' ? "Alt+Cmd+I" : "CommandOrControl+W",
          accelerator: 'CommandOrControl+O',
          click: () => {
            win.webContents.send('main_msg', 'open_database')
          }
        },
        {
          label: '保存',
          accelerator: 'CommandOrControl+SHIFT+S',
          click: () => {
            win.webContents.send('main_msg', 'save_all')
          }
        },
        {
          label: '悬浮面板',
          accelerator: 'CommandOrControl+SHIFT+Q',
          click: () => {
            win.webContents.send('main_msg', 'toggle_float_panel_right')
          }
        },
        {
          label: '灵感面板',
          accelerator: 'CommandOrControl+Q',
          click: () => {
            win.webContents.send('main_msg', 'toggle_inspiration_float_panel')
          }
        },
        {
          label: '事件面板',
          accelerator: 'CommandOrControl+SHIFT+E',
          click: () => {
            win.webContents.send('main_msg', 'toggle_event_float_panel')
          }
        },
        {
          label: '设置面板',
          accelerator: 'CommandOrControl+SHIFT+A',
          click: () => {
            win.webContents.send('main_msg', 'toggle_preference_float_panel')
          }
        },
        {
          label: '命令输入框',
          accelerator: 'CommandOrControl+/',
          click: () => {
            win.webContents.send('main_msg', 'show_command_input_box')
          }
        },
        {
          label: 'Toggle Dev Tools',
          role: 'toggleDevTools'
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '近义词',
          accelerator: "CommandOrControl+'",
          click: () => {
            win.webContents.send('main_msg', 'get_synonym')
          }
        }
        // {
        //   label: '刷新编辑器',
        //   accelerator: 'CommandOrControl+SHIFT+R',
        //   click: () => {
        //     win.webContents.send('main_msg', 'refresh_editor')
        //   }
        // }
      ]
    },
    {
      label: '章节',
      submenu: [
        {
          label: '新建章节',
          accelerator: 'CommandOrControl+N',
          click: () => {
            win.webContents.send('main_msg', 'new_chapter')
          }
        },
        {
          label: '保存',
          accelerator: 'CommandOrControl+S',
          click: () => {
            // win.webContents.send('main_msg', 'save')
            win.webContents.send('save')
          }
        },
        {
          label: '新建分组',
          accelerator: 'CommandOrControl+SHIFT+N',
          click: () => {
            win.webContents.send('main_msg', 'new_group')
          }
        },
        {
          label: '显示/隐藏章节模板面板',
          accelerator: 'CommandOrControl+SHIFT+T',
          click: () => {
            win.webContents.send('main_msg', 'toggle_chapter_template_panel')
          }
        },
        // {
        //   label: '删除章节',
        //   accelerator: "CommandOrControl+D",
        //   click: () => {
        //     win.webContents.send('main_msg', 'delect_current_chapter')
        //   }
        // },
        // {
        //   label: '删除分组',
        //   accelerator: "CommandOrControl+SHIFT+D",
        //   click: () => {
        //     win.webContents.send('main_msg', 'delect_current_group')
        //   }
        // },
        {
          label: '备份章节',
          accelerator: 'CommandOrControl+SHIFT+B',
          click: () => {
            win.webContents.send('main_msg', 'backup_current_chapter')
          }
        },
        {
          label: '关闭当前章节',
          // accelerator: process.platform === 'darwin' ? "Alt+Cmd+I" : "CommandOrControl+W",
          accelerator: 'CommandOrControl+W',
          click: () => {
            win.webContents.send('main_msg', 'close_current_editor')
          }
        },
        {
          label: '切换编辑器',
          accelerator: 'CommandOrControl+Tab',
          click: () => {
            win.webContents.send('main_msg', 'switch_editor')
            // alert(12312313)
          }
        }
      ]
    }
  ]
  const appMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(appMenu)
}
export default createMenu
