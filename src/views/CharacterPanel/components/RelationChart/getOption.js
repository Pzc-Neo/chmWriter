export default function () {
  var categories = []
  for (var i = 0; i < 2; i++) {
    categories[i] = {
      name: '类目' + i
    }
  }

  return {
    // 图的标题
    // title: {
    //   text: 'ECharts 关系图'
    // },
    // 提示框的配置
    tooltip: {
      formatter: function (x) {
        return x.data.des
      }
    },
    // 工具箱
    toolbox: {
      // 显示工具箱
      show: true,
      feature: {
        mark: {
          show: true
        },
        // 还原
        restore: {
          show: true
        },
        // 保存为图片
        saveAsImage: {
          show: true
        }
      }
    },
    legend: [
      {
        // selectedMode: 'single',
        data: categories.map(function (a) {
          return a.name
        })
      }
    ],
    series: [
      {
        type: 'graph', // 类型:关系图
        layout: 'force', // 图的布局，类型为力导图
        symbolSize: 70, // 调整节点的大小
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [2, 10],
        force: {
          repulsion: 500,
          edgeLength: [10, 300]
        },
        draggable: true,
        lineStyle: {
          normal: {
            width: 2,
            color: '#4b565b'
          }
        },
        edgeLabel: {
          normal: {
            show: true,
            formatter: function (x) {
              return x.data.name
            },
            textStyle: {
              fontSize: 15
            }
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 15
            }
          }
        },
        data: this.relationData,
        // 数据
        links: this.linkData,
        categories: categories
      }
    ]
  }
}
