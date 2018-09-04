import React, {Component} from 'react';

// Components
import ImageModal from '../modals/image-modal/';
import Carousel from '../carousel/';

class EventImages extends Component {

    constructor(props) {
        super(props);

        this.state = {files:[], imageModal: false}
    }

    submitImage() {
        const { upload } = this.props;
        upload(this.state.files[0]);
        this.setState({files:[]});
    }

    toggleImageModal = () => {
        this.setState({imageModal: !this.state.imageModal});
        if (this.state.imageModal && this.state.files.length > 0)
            this.submitImage();
    };

    onPreviewDrop = (files) => {
        this.setState({files: this.state.files.concat(files)});
    };

    render() {

        const { images } = this.props;

        return (
            <div className='px-4'>
                <div className='d-flex justify-content-between mb-4'>
                    <h3>Event pics</h3>
                    <button onClick={this.toggleImageModal}>Upload pic</button>
                </div>
                {
                    images.length === 0
                        ? <p>This event does not have any pic yet</p>
                        : <Carousel images={images} />
                }
                <ImageModal isOpen={this.state.imageModal} toggle={this.toggleImageModal} className={this.props.className}
                            files={this.state.files} onPreviewDrop={this.onPreviewDrop}/>
            </div>

        )
    }
}

export default EventImages;
