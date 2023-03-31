export default interface LiferayParams {
    portletElementId: string;
    contextPath: string;
    portletNamespace: string;
    configuration: {
        system: any,
        portletInstance: any
    };
}
