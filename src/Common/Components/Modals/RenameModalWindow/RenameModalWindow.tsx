
export const RenameModalWindow = (props: {active: boolean, setActive: ((val: boolean) => void)}, child: ChildNode) => {

    return (
        <div className={ props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className={ props.active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
               <p>Test text</p>
               {child}
            </div>
        </div>
    );
}