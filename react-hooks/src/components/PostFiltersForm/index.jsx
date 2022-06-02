import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
}

function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeOutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        };

        typingTimeOutRef.current = setTimeout(() => {
            const formValue = {
                searchTerm: value,
            };

            onSubmit(formValue);
        }, 300)
    }
    return (
        <form action="">
            <input type="text"
                value={searchTerm}
                onChange={handleSearchTermChange} />
        </form>
    );
}

export default PostFiltersForm;