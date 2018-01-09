//将季节代码翻译成代码
export const seasonToCode = (val) =>{
    let season_name = ''
                switch(val){
                    case '春季' :
                    season_name = 'spring'
                    break

                    case '夏季' :
                    season_name = 'summer'
                    break

                    case '秋季' :
                    season_name = 'autumn'
                    break

                    case '冬季' :
                    season_name = 'winter'
                    break

                    default : 
                        season_name = '字段错误'
                }
                return season_name
}
