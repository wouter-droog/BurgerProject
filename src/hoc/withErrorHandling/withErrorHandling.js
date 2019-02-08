import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

// import axios from 'axios';

const withErrorHandling = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {

            return (
                <>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
}

export default withErrorHandling;