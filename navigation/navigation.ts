import {Navigation, Options} from 'react-native-navigation';

export async function pushScreen({
                                     componentId,
                                     screenName,
                                     passProps,
                                     options,
                                 }: {
    componentId: string;
    screenName: string;
    passProps?: any;
    options?: Options;
}) {
    await Navigation.push(componentId, {
        component: {
            name: screenName,
            passProps,
            options,
        },
    });
}

export async function pop(componentId: string) {
    await Navigation.pop(componentId);
}

export async function dismissModal(componentId: string) {
    await Navigation.dismissModal(componentId);
}

export async function mergeOptions({
                                       componentId,
                                       options,
                                   }: {
    componentId: string;
    options: Options;
}) {
    await Navigation.mergeOptions(componentId, options);
}

export async function showModal({
                                    screenName,
                                    passProps,
                                    modalId,
                                }: {
    screenName: string;
    passProps?: any;
    modalId?: string;
}) {
    await Navigation.showModal({
        stack: {
            id: modalId,
            children: [
                {
                    component: {
                        name: screenName,
                        passProps,
                    },
                },
            ],
        },
    });
}
