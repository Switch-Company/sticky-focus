class StickyFocus{
  constructor( options ){

    if( !options.elements ){
      throw new Error( 'No elements array passed.' );
    }

    this._handleFocus = this._handleFocus.bind( this );

    this.update( options.elements );

    delete options.elements;

    this.options = Object.assign({
      padding: 0
    }, options );

    this._listen();
  }

  get currentHeight(){
    return this._currentHeight;
  }

  _listen(){
    document.body.addEventListener( 'focus', this._handleFocus, true );
  }

  _handleFocus( event ){
    const parentElement = this._data.find(({ el }) => el.contains( event.target ));

    // don't try to change the scroll if the focused element is in the sticky element
    if( parentElement ){
      return;
    }

    // get the screen position of the focused element
    const focusTop = event.target.getBoundingClientRect().top;
    // get the current scroll
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // scroll when the focused element is under the sticky element
    if( focusTop < this._currentHeight ){
      const newScrollTop = Math.floor( scrollTop - ( this._currentHeight - focusTop + this.options.padding ));

      document.documentElement.scrollTop = document.body.scrollTop = newScrollTop;
    }
  }

  refresh(){
    this.update( this.elements );
  }

  restart( elements ){
    if( elements ){
      this.update( elements );
    }
    else {
      this.refresh();
    }

    this._listen();
  }

  stop(){
    document.body.removeEventListener( 'focus', this._handleFocus, true );
  }

  update( elements ){
    this.elements = elements;

    this._data = elements.map( el => {
      return {
        el,
        height: el.getBoundingClientRect().bottom
      };
    });

    this._currentHeight = Math.ceil( Math.max.apply( null, this._data.map( el => el.height )));
  }
}

export default StickyFocus;
