class Hex{
    constructor(x, y, size){
        this.size = size

        this.id = size*x+y
        this.x = x
        this.y = y
        this.dir = 0
        this.div = null
        this.type = 'wall'

        this.active = false
    }


    getEntrance(x = this.x, y = this.y, max = this.size - 1){

        let doors = []

        if(y > 0)
            if(this.getByCoords(x, y-1).dir == 3)
                doors.push(0)

        if(y < max){
            let h = this.getByCoords(x, y+1) 

            if(h.active && h.dir == 0)
                doors.push(3)
        }


        if(x < max)
            if(x % 2){
                if(this.getByCoords(x+1, y).dir == 4)
                    doors.push(1)

                if(y < max)
                    if(this.getByCoords(x+1, y+1).dir == 5)
                        doors.push(2)
            }
            else{
                if(this.getByCoords(x+1, y).dir == 5)
                    doors.push(2)

                if(y > max)
                    if(this.getByCoords(x+1, y-1).dir == 4)
                        doors.push(1)
            }
            
            
        if(x > 0)
            if(x % 2){
                if(this.getByCoords(x-1, y).dir == 2)
                    doors.push(5)

                if(y < max)
                    if(this.getByCoords(x-1, y+1).dir == 1)
                        doors.push(4)
            }
            else{
                if(this.getByCoords(x-1, y).dir == 1)
                    doors.push(4)

                if(y > 0)
                    if(this.getByCoords(x-1, y-1).dir == 2)
                        doors.push(5)
            }

        if(!doors.includes(this.dir))
            doors.push(this.dir)

        doors.sort((a, b) => {return a > b})
        return doors
    }


    getByCoords(x, y){
        for(let i of editor.hexes)
            if(i.x == x && i.y == y)
                return i
    }
    

    export(){
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            dirIn: this.getEntrance(),
            dirOut: this.dir,
            type: this.type
        }
    }

    getDom(){
        if(!this.div)
            this.createDom()

        return this.div
    }

    createDom(){
        this.div = $('<div></div>')
        let offset = $("#hexes").offset()

        this.div.on('click', () => this.click())
        this.div.attr('id', this.id)
        this.div.css('top', this.y * 103 + offset.top + (this.x % 2 ? 52 : 0) + 'px')
        this.div.css('left',  this.x * 93 + offset.left +'px')

        this.div.addClass('hex')
    }


    click(){
        if(editor.activeType != this.type){
            this.type = type
            this.active = true
            editor.updateJSON()
        }

        let arrow = $('<div></div>')
        arrow.addClass('arrow')

        this.dir = (this.dir + 1) % 6

        arrow.text(this.dir)
        arrow.css('transform', 'rotate('+ this.dir * 60 +'deg)')
    
        this.div.html('')
        arrow.appendTo(this.div)
        this.active = true
        editor.updateJSON()
    }
}
