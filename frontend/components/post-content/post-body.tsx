import styles from './post-body.module.css'

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl container mx-auto my-6 px-6">
      <div
        className={`${styles.content} ck-content`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
