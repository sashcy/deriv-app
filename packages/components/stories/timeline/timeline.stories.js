import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Timeline from 'Components/timeline';
import Theme from '../shared/theme';

const stories = storiesOf('Timeline', module);

const Item = <div></div>;
stories.addDecorator(withKnobs).addDecorator(withInfo);

stories.add('basic usage', () => (
    <Theme is_dark={boolean('Theme', true)}>
        <div style={{ display: 'flex' }}>
            <div>left component</div>
            <Timeline>
                <Timeline.Item title='Title'>
                    <div>test</div>
                </Timeline.Item>
                <Timeline.Item title='Title2'>
                    <div>test2</div>
                </Timeline.Item>
                <Timeline.Item title='Title3'>
                    <div>test3</div>
                </Timeline.Item>
            </Timeline>
        </div>
    </Theme>
));
