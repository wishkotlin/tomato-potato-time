import React from 'react'
import { withRouter } from "react-router-dom";


interface MyCompProps {
    model: any;
    modParams: any;
    modparams: any
}

interface MyCompState {
    derived1?: any;
    derived2?: any;

    initialized: boolean;

    prevModel?: any;
    prevModParams?: any;
}

class MyComp extends React.Component<MyCompProps, MyCompState> {
    constructor(props:any) {
        super(props)
            this.state = {
                    initialized: false,
            } as MyCompState;
    }

    static getDerivedStateFromProps(nextProps: MyCompProps, prevState: MyCompState): MyCompState {
            let nextState = {} as MyCompState;

            if (!prevState.initialized) {
                    // ...
            }

            if (nextProps.model !== prevState.prevModel) {
                    // nextState.derived1 = this.calcDerived1(nextProps.model);
                    nextState.prevModel = nextProps.model;
            }

            if (nextProps.modparams !== prevState.prevModParams) {
                    // nextState.derived2 = this.calcDerived2(nextProps.modparams);
                    nextState.prevModParams = nextProps.modparams;
            }

            nextState.initialized = true;

            return nextState;
    }
}


export default withRouter(MyComp)