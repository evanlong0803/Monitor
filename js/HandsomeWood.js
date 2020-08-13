//Ajax调用API接口
$(function () {
  $.ajax({
    url: 'https://view.inews.qq.com/g2/getOnsInfo',
    dataType: 'jsonp',
    data: {
      name: 'disease_h5'
    },
    success: function (result) {
      data = JSON.parse(result.data);
      time();
      left1();
      left3();
      center1();
      center2();
      rigth3();
    }
  });

  $.ajax({
    url: 'https://view.inews.qq.com/g2/getOnsInfo',
    dataType: 'jsonp',
    data: {
      name: 'disease_other'
    },
    success: function (result) {
      other = JSON.parse(result.data);
      left2();
      rigth1();
      rigth2();
    }
  });
})

/**
 * 实时显示时间
 */
// let htime = new Date();


//数据更新时间
let time = () => $('.echart-time').text(data.lastUpdateTime);

//全国累计确诊省市
function left1() {
  console.log(data);
  // 1.基于准备好的dom，初始化echarts实例
  let left1Chart = echarts.init(document.querySelector('.left-chart-one-chart'));

  // 2. 指定配置和数据
  let left1option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [{
      type: "category",
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: "12",
          fontFamily: '微软雅黑',
          fontStyle: 'normal',
        },
        rotate: 50,
      },
      axisLine: {
        show: false
      }
    }],
    yAxis: [{
      type: "value",
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: "12"
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
          // width: 1,
          // type: "solid"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
      name: "",
      type: "bar",
      barWidth: "35%",
      data: [],
      itemStyle: {
        barBorderRadius: 5
      }
    }]
  };

  let provinces = data.areaTree[0].children;
  let topData = [];
  for (let province of provinces) {
    topData.push({
      'name': province.name,
      'value': province.total.confirm
    });
  }
  // 降序排列
  topData.sort(function (a, b) {
    return b.value - a.value;
  });
  // 只保留前10条
  topData.length = 10;
  // 分别取出省份名称和数据
  for (let content of topData) {
    left1option.xAxis[0].data.push(content.name);
    left1option.series[0].data.push(content.value);
  }

  // 把配置给实例对象
  left1Chart.setOption(left1option);
  window.addEventListener("resize", function () {
    left1Chart.resize();
  });
};

//全国累计趋势
function left2() {
  console.log(other);
  // 1.基于准备好的dom，初始化echarts实例
  let left2Chart = echarts.init(document.querySelector(".left-chart-two-chart"));

  // 2. 指定配置和数据
  let left2option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    xAxis: [{
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          },
          rotate: 50,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },
        data: []
      },
      {
        axisPointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        position: "bottom",
        offset: 20
      }
    ],
    yAxis: [{
      type: "value",
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        }
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [
      {
        name: "累计确诊",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      },
      {
        name: "累计治愈",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      },
      {
        name: "累计死亡",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#666",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#666",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      }
    ]
  };

  let chinaDayList = other.chinaDayList;
  for (let DayList of chinaDayList) {
    left2option.xAxis[0].data.push(DayList.date);
    left2option.series[0].data.push(DayList.confirm);
    left2option.series[1].data.push(DayList.heal);
    left2option.series[2].data.push(DayList.dead);
  }

  // 3. 把配置和数据给实例对象
  left2Chart.setOption(left2option);

  // 重新把配置好的新数据给实例对象
  window.addEventListener("resize", function () {
    left2Chart.resize();
  });
};

//全国省市治愈TOP10
function left3() {
  // 基于准备好的dom，初始化echarts实例
  let left3Chart = echarts.init(document.querySelector(".left-chart-three-chart"));

  left3option = {
    tooltip: {
      trigger: "item",
      // formatter: "{a} <br/>{b}: {c} ({d}%)",
      position: function (p) {
        //其中p为当前鼠标的位置
        return [p[0] + 10, p[1] - 10];
      }
    },
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      data: [],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [{
      name: "已治愈",
      type: "pie",
      center: ["50%", "42%"],
      radius: ["40%", "60%"],
      color: [
        "#065aab",
        "#066eab",
        "#0682ab",
        "#0696ab",
        "#06a0ab",
        "#06b4ab",
        "#06c8ab",
        "#06dcab",
        "#06f0ab"
      ],
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: []
    }]
  };


  let provinces = data.areaTree[0].children;
  let topData = [];
  for (let province of provinces) {
    // console.log(province.children[0].total);
    topData.push({
      'name': province.name,
      'value': province.children[0].total.heal
    });
  }
  // 降序排列
  topData.sort(function (a, b) {
    return b.value - a.value;
  });
  // 只保留前5条
  topData.length = 10;

  // 分别取出省份名称和数据
  for (let province of topData) {
    left3option.series[0].data.push(province);
    left3option.legend.data.push(province.name);
  }


  // 使用刚指定的配置项和数据显示图表。
  left3Chart.setOption(left3option);
  window.addEventListener("resize", function () {
    left3Chart.resize();
  });
};

//全国病例总计
function center1() {
  $('.nowConfirm-number').text(data.chinaTotal.nowConfirm); //现有确诊
  $('.noInfect-number').text(data.chinaTotal.noInfect); //无症状
  $('.suspect-number').text(data.chinaTotal.suspect); //现有疑似
  $('.nowSevere-number').text(data.chinaTotal.nowSevere); //现有重症
  $('.confirm-number').text(data.chinaTotal.confirm); //累计确诊
  $('.importedCase-number').text(data.chinaTotal.importedCase); //境外输入
  $('.heal-number').text(data.chinaTotal.heal); //累计治愈
  $('.dead-number').text(data.chinaTotal.dead); //累计死亡

  $('.add-nowConfirm-number').text(data.chinaAdd.nowConfirm + "例"); //新增现有确诊
  $('.add-noInfect-number').text(data.chinaAdd.noInfect + "例"); //新增无症状
  $('.add-suspect-number').text(data.chinaAdd.suspect + "例"); //新增现有疑似
  $('.add-nowSevere-number').text(data.chinaAdd.nowSevere + "例"); //新增现有重症
  $('.add-confirm-number').text(data.chinaAdd.confirm + "例"); //新增累计确诊
  $('.add-importedCase-number').text(data.chinaAdd.importedCase + "例"); //新增境外输入
  $('.add-heal-number').text(data.chinaAdd.heal + "例"); //新增累计治愈
  $('.add-dead-number').text(data.chinaAdd.dead + "例"); //新增累计死亡
};

//地图累计确诊数据
function center2() {
  // 1. 实例化对象
  let center2Chart = echarts.init(document.querySelector(".center-chart-map"));
  // 2. 指定配置项和数据
  let center2option = {
    title: {
      text: '',

    },
    tooltip: {
      trigger: 'item',
      triggerOn: "mousemove",
      backgroundColor: 'rgba(29, 38, 71)',
      // 额外附加的阴影
      extraCssText: 'box-shadow:0 0 4px rgba(11, 19, 43,0.8)',
    },
    visualMap: { // 左侧小导航图标
      show: true,
      x: 'left',
      y: 'bottom',
      textStyle: {
        fontSize: 8,
        color: 'white',
      },
      splitList: [{
          start: 1,
          end: 9
        },
        {
          start: 10,
          end: 99
        },
        {
          start: 100,
          end: 999
        },
        {
          start: 1000,
          end: 9999
        },
        {
          start: 10000
        }
      ],
      color: ['#8A3310', '#C64918', '#E55B25', '#F2AD92', '#F9DCD1']
    },
    series: [{
      name: '累计确诊人数',
      type: 'map',
      mapType: 'china',
      roam: false, // 禁用拖动和缩放
      itemStyle: { // 图形样式
        normal: {
          borderWidth: .5, //区域边框宽度
          borderColor: '#69414b', //区域边框颜色
          areaColor: '#ffefd5', //区域颜色
        },
        emphasis: { // 鼠标滑过地图高亮的相关设置
          borderWidth: .5,
          borderColor: '#69414b',
          areaColor: '#fff',
        }
      },
      label: { // 图形上的文本标签
        normal: {
          show: true, //省份名称
          fontSize: 8,
        },
        emphasis: {
          show: true,
          fontSize: 8,
        }
      },
      data: [] // [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}]
    }]
  };

  let provinces = data.areaTree[0].children;
  for (let province of provinces) {
    center2option.series[0].data.push({
      'name': province.name,
      'value': province.total.confirm
    });
  }
  // 3. 配置项和数据给我们的实例化对象
  center2Chart.setOption(center2option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    center2Chart.resize();
  });
};

//全国治愈/病死趋势
function rigth1() {
  // 1. 实例化对象
  let rigth1Chart = echarts.init(document.querySelector(".right-chart-one-chart"));
  // 2. 指定配置和数据
  let rigth1option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },

    xAxis: [{
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          },
          rotate: 50,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: []
      },
      {
        axisPointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        position: "bottom",
        offset: 20
      }
    ],

    yAxis: [{
      type: "value",
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        }
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
        name: "治愈例数",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        // {c} 会自动的解析为 数据  data里面的数据
        formatter: "{c}%",
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      },
      {
        name: "死亡例数",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#666666",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#666666",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      }
    ]
  };

  let chinaDayAddList = other.chinaDayAddList;
  for (let day of chinaDayAddList) {
    rigth1option.xAxis[0].data.push(day.date);
    rigth1option.series[0].data.push(day.heal);
    rigth1option.series[1].data.push(day.dead);
  }

  // 3. 把配置给实例对象
  rigth1Chart.setOption(rigth1option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function () {
    rigth1Chart.resize();
  });

};

//全国新增趋势
function rigth2() {
  // 基于准备好的dom，初始化echarts实例
  let rigth2Chart = echarts.init(document.querySelector(".right-chart-two-chart"));

  let rigth2option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },

    xAxis: [{
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          },
          rotate: 50,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: []
      },
      {
        axisPointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        position: "bottom",
        offset: 20
      }
    ],

    yAxis: [{
      type: "value",
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      },
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        }
      },

      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      }
    }],
    series: [{
        name: "新增确诊",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      },
      {
        name: "新增疑似",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: []
      }
    ]
  };

  let chinaDayAddList = other.chinaDayAddList;
  for (let day of chinaDayAddList) {
    rigth2option.xAxis[0].data.push(day.date);
    rigth2option.series[0].data.push(day.confirm);
    rigth2option.series[1].data.push(day.suspect);
  }

  // 使用刚指定的配置项和数据显示图表。
  rigth2Chart.setOption(rigth2option);
  window.addEventListener("resize", function () {
    rigth2Chart.resize();
  });
};

//境外输入省市TOP10
function rigth3() {
  // 1. 实例化对象
  let rigth3Chart = echarts.init(document.querySelector(".right-chart-three-chart"));
  // 2. 指定配置项和数据
  let rigth3option = {
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [{
      name: "境外输入病例",
      type: "pie",
      // 如果radius是百分比则必须加引号
      radius: ["10%", "70%"],
      center: ["50%", "42%"],
      roseType: "radius",
      data: [],
      // 修饰饼形图文字相关的样式 label对象
      label: {
        fontSize: 10
      },
      // 修饰引导线样式
      labelLine: {
        // 连接到图形的线长度
        length: 10,
        // 连接到文字的线长度
        length2: 10
      }
    }]
  };

  let provinces = data.areaTree[0].children;
  let topData = [];
  for (let province of provinces) {
    if (province.children[0].name == '境外输入') {
      topData.push({
        'name': province.name,
        'value': province.children[0].total.confirm
      });
    }
  }
  // 降序排列
  topData.sort(function (a, b) {
    return b.value - a.value;
  });
  // 只保留前5条
  topData.length = 10;
  // 分别取出省份名称和数据
  for (let province of topData) {
    rigth3option.series[0].data.push(province);
  }

  // 3. 配置项和数据给我们的实例化对象
  rigth3Chart.setOption(rigth3option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    rigth3Chart.resize();
  });
};

console.log('123木头人 | https://123mtr.top');
console.log('gitee仓库 | https://gitee.com/handsomewood/Monitor');
console.log('我的老师 | http://www.tangxiaoyang.vip');