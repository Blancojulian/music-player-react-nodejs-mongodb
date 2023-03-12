const VolumeIcon = ({ volume }) => {
    let icon = <></>;

    if (volume === 0) {
        icon = <i className='bx bx-volume-mute'></i>;
    } else if (volume > 0.75) {
        icon = <i className='bx bx-volume-full'></i>;
    } else if (volume > 0.4) {
        icon = <i className='bx bx-volume-low'></i>;
    } else {
        icon = <i className='bx bx-volume'></i>;
    }

    return icon;
}

export default VolumeIcon;