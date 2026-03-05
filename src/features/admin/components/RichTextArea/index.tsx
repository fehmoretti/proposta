'use client';

import { Input } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useEffect, useRef } from 'react';
import styles from './RichTextArea.module.css';

interface RichTextAreaProps {
  label?: string;
  description?: string;
  placeholder?: string;
  withAsterisk?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function RichTextArea({
  label,
  description,
  placeholder,
  withAsterisk,
  value,
  onChange,
}: RichTextAreaProps) {
  const skipUpdate = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        code: false,
      }),
      Underline,
      Highlight,
    ],
    content: value || '',
    onUpdate: ({ editor: ed }) => {
      skipUpdate.current = true;
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (skipUpdate.current) {
      skipUpdate.current = false;
      return;
    }
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <Input.Wrapper
      label={label}
      description={description}
      withAsterisk={withAsterisk}
      styles={{
        label: { color: 'var(--color-neutral-light-4)' },
        description: { color: 'var(--color-neutral-light-8)' },
      }}
    >
      <RichTextEditor editor={editor} className={styles.editor}>
        <RichTextEditor.Toolbar className={styles.toolbar}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className={styles.content} />
      </RichTextEditor>
    </Input.Wrapper>
  );
}
