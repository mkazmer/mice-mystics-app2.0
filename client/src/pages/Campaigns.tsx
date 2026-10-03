import { useState, type FormEvent } from 'react'
import { useMe } from '../api/auth'
import {
  useCampaigns,
  useCreateCampaign,
  useDeleteCampaign,
  useUpdateCampaign,
  type Campaign,
  type CampaignStatus,
} from '../api/campaigns'
import './Campaigns.scss'

const statusLabels: Record<CampaignStatus, string> = {
  ACTIVE: 'In progress',
  COMPLETED: 'Completed',
  ABANDONED: 'Abandoned',
}

export default function Campaigns() {
  const { data: user } = useMe()
  const { data: campaigns, isPending, error } = useCampaigns()

  const active = campaigns?.filter(c => c.status === 'ACTIVE') ?? []
  const past = campaigns?.filter(c => c.status !== 'ACTIVE') ?? []

  return (
    <div className="Campaigns">
      <h1>{user?.displayName}'s Campaigns</h1>
      <NewCampaignForm />
      {isPending && <p>Loading campaigns…</p>}
      {error && <p className="form-error">{error.message}</p>}
      {campaigns && (
        <>
          <h2>Current</h2>
          {active.length ? active.map(c => <CampaignRow key={c.id} campaign={c} />) : <p>No campaign in progress.</p>}
          <h2>Previous</h2>
          {past.length ? past.map(c => <CampaignRow key={c.id} campaign={c} />) : <p>No finished campaigns yet.</p>}
        </>
      )}
    </div>
  )
}

function NewCampaignForm() {
  const [name, setName] = useState('')
  const create = useCreateCampaign()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    create.mutate({ name }, { onSuccess: () => setName('') })
  }

  return (
    <form className="panel new-campaign" onSubmit={onSubmit}>
      <label htmlFor="campaign-name">Start a new campaign</label>
      <div className="row">
        <input
          id="campaign-name"
          placeholder="e.g. Saturday group"
          required
          maxLength={100}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="btn" type="submit" disabled={create.isPending}>
          Start
        </button>
      </div>
      {create.error && <p className="form-error">{create.error.message}</p>}
    </form>
  )
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const update = useUpdateCampaign()
  const remove = useDeleteCampaign()

  return (
    <div className="panel campaign">
      <div className="campaign-header">
        <h3>{campaign.name}</h3>
        <span className={`status ${campaign.status.toLowerCase()}`}>{statusLabels[campaign.status]}</span>
      </div>
      <div className="campaign-controls">
        <div className="chapter">
          <button
            className="btn secondary"
            aria-label="Previous chapter"
            disabled={campaign.currentChapter <= 1 || update.isPending}
            onClick={() => update.mutate({ id: campaign.id, currentChapter: campaign.currentChapter - 1 })}
          >
            −
          </button>
          <span>Chapter {campaign.currentChapter}</span>
          <button
            className="btn secondary"
            aria-label="Next chapter"
            disabled={update.isPending}
            onClick={() => update.mutate({ id: campaign.id, currentChapter: campaign.currentChapter + 1 })}
          >
            +
          </button>
        </div>
        <select
          aria-label="Campaign status"
          value={campaign.status}
          disabled={update.isPending}
          onChange={e => update.mutate({ id: campaign.id, status: e.target.value as CampaignStatus })}
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          className="btn secondary"
          disabled={remove.isPending}
          onClick={() => {
            if (confirm(`Delete "${campaign.name}"? This can't be undone.`)) remove.mutate(campaign.id)
          }}
        >
          Delete
        </button>
      </div>
      <p className="meta">
        Started {new Date(campaign.createdAt).toLocaleDateString()}
        {campaign.completedAt && ` · Finished ${new Date(campaign.completedAt).toLocaleDateString()}`}
      </p>
      {(update.error || remove.error) && <p className="form-error">{(update.error ?? remove.error)?.message}</p>}
    </div>
  )
}
