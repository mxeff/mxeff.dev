declare module '@linaria/react' {
    import type { CSSProperties } from '@linaria/core';
    import type { StyledMeta } from '@linaria/tags';
    import type { FunctionalComponent } from 'preact';
    import type { JSXInternal } from 'preact/src/jsx';

    type IntrinsicElements = JSXInternal.IntrinsicElements;

    type HtmlStyledTag<TName extends keyof IntrinsicElements> = <
        // eslint-disable-next-line @typescript-eslint/ban-types
        TAdditionalProps = {}
    >(
        strings: TemplateStringsArray,
        ...exprs: (
            | string
            | number
            | CSSProperties
            | StyledMeta
            | ((
                  props: IntrinsicElements[TName] &
                      Omit<TAdditionalProps, never>
              ) => string | number)
        )[]
    ) => FunctionalComponent<IntrinsicElements[TName] & TAdditionalProps>;

    type StyledJSXIntrinsics = {
        readonly [K in keyof IntrinsicElements]: HtmlStyledTag<K>;
    };

    type Styled = StyledJSXIntrinsics;
    const styled: Styled;
}
